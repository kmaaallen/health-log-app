import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { withTheme, Button, Dialog, TextInput, Portal, Surface, HelperText } from 'react-native-paper';
//REDUX
import { connect } from 'react-redux';
import { createHabit } from '../redux/actions';
//FORM
import { useForm, Controller } from "react-hook-form";
//COMPONENTS
import { Picker } from "@react-native-picker/picker";

const styles = theme => StyleSheet.create({
    surface: {
        padding: theme.spacing.medium,
        margin: theme.spacing.medium,
    },
    pickerView: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        height: 100
    }
});

//TODO CHECK HOW IT LOOKS ON ANDROID
//TODO STYLE ON ALL DEVICES
//TODO ALLOW SELECTION OF MULTIPLE CATEGORIES
//TODO ALLOW UPDATE OF CATEGORIES
//LOG PAGE RE-ORDER AND FILTER HABITS
//TODO SORT OUT MOBILE MODAL OVERLAP ISSUE

export const CreateHabit = (props) => {
    const [showDialog, setShowDialog] = useState(false);

    const { control, reset, handleSubmit, watch, formState: { errors }, register } = useForm({
        mode: 'onSubmit',
    });

    const watchCategoryPicker = watch("category", false);

    const createHabit = (formData) => {
        var category;
        formData.newCategory ? category = formData.newCategory : category = formData.category;
        props.createHabit(formData.title, formData.limit, category);
        setShowDialog(false);
        reset();
    }

    return (
        <Surface elevation={4} style={styles(props.theme).surface}>
            <Button onPress={() => setShowDialog(true)}>Create new habit</Button>
            <Portal>
                <Dialog visible={showDialog} onDismiss={() => setShowDialog(false)}>
                    <Dialog.Title>Create a habit</Dialog.Title>
                    <Dialog.Content>
                        <Controller
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <TextInput
                                    label="Title"
                                    onChangeText={value => onChange(value)}
                                    value={value || ''} // to remove uncontrolled to controlled error
                                    testID="title-input"
                                />
                            )}
                            name="title"
                            rules={{ required: true }}
                        />
                        {errors.title && <HelperText type="error" >Title is required</HelperText>}
                        <Controller
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <TextInput
                                    label="Daily limit"
                                    keyboardType="numeric"
                                    onChangeText={value => onChange(value)}
                                    value={value || ''}
                                    testID="limit-input"
                                />
                            )}
                            name="limit"
                            rules={{ required: true, min: 1 }}
                        />
                        {errors.limit && <HelperText type="error">{errors.limit.type == 'min' ? 'Limit must be greater than zero' : 'Limit is required'}</HelperText>}

                        <Controller
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <View style={styles(props.theme).pickerView}>
                                    <Picker
                                        selectedValue={value}
                                        onValueChange={value => onChange(value)}
                                        itemStyle={{ fontSize: 16, height: 100 }}
                                        testID="category-input"
                                    >
                                        <Picker.Item label="Please select a category" value="" key="empty" testID="select-category" />
                                        <Picker.Item label="New category" value="New category" key="New category" testID="new-category" />
                                        {props.categories.map((item) => (<Picker.Item key={item} label={item} value={item} />))}
                                    </Picker>
                                </View>
                            )}
                            name="category"
                            rules={{ required: false }}
                        />
                        {watchCategoryPicker == 'New category' ? <Controller
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <TextInput
                                    label="New Category"
                                    onChangeText={value => onChange(value)}
                                    value={value || ''}
                                    testID="new-category"
                                    placeholder="Create a new category"
                                />
                            )}
                            name="newCategory"
                            rules={{ required: false }}
                        /> : null}
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={() => setShowDialog(false)}>Cancel</Button>
                        <Button onPress={handleSubmit(createHabit)}>Ok</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </Surface >

    );
};

const mapStateToProps = (state) => ({
    categories: [...new Set((Object.values(state.habits.habits)).map((item) => item.category))].filter(item => item != "" && item != undefined).sort(),
})

const mapDispatchToProps = (dispatch) => {
    return {
        createHabit: (title, limit, category) => dispatch(createHabit({ updated: (new Date()).valueOf(), title: title, limit: limit, category: category }))
    }
}

export default withTheme(connect(mapStateToProps, mapDispatchToProps)(CreateHabit));