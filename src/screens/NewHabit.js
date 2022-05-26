import React from 'react';
import { StyleSheet, ScrollView, KeyboardAvoidingView, View } from 'react-native';
import { withTheme, Button, TextInput, HelperText, Paragraph } from 'react-native-paper';
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
    },
    topText: {
        textAlign: 'center',
        paddingTop: 5
    }
});

function NewHabit(props) {

    const { control, reset, handleSubmit, watch, formState: { errors }, register } = useForm({
        mode: 'onSubmit',
    });

    const watchCategoryPicker = watch("category", false);

    const createHabit = (formData) => {
        var category;
        formData.newCategory ? category = formData.newCategory : category = formData.category;
        props.createHabit(formData.title, formData.limit, category);
        props.navigation.navigate('Log');
    }

    return (
        <KeyboardAvoidingView behavior='padding'>
            <ScrollView>
                <Paragraph style={styles(props.theme).topText}>Create a new habit</Paragraph>
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
                <Button onPress={handleSubmit(createHabit)}>Ok</Button>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const mapStateToProps = (state) => ({
    categories: [...new Set((Object.values(state.habits.habits)).map((item) => item.category))].filter(item => item != "" && item != undefined).sort(),
})

const mapDispatchToProps = (dispatch) => {
    return {
        createHabit: (title, limit, category) => dispatch(createHabit({ updated: (new Date()).valueOf(), title: title, limit: limit, category: category }))
    }
}

export default withTheme(connect(mapStateToProps, mapDispatchToProps)(NewHabit));