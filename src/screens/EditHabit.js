import React from 'react';
import { StyleSheet, ScrollView, KeyboardAvoidingView, View } from 'react-native';
import { withTheme, Button, TextInput, HelperText, Paragraph } from 'react-native-paper';
//REDUX
import { connect } from 'react-redux';
import { updateHabit } from '../redux/actions';
//FORM
import { useForm, Controller } from "react-hook-form";
//COMPONENTS
import { Picker } from "@react-native-picker/picker";
//NAVIGATION
import { useRoute } from '@react-navigation/native';

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

function EditHabit(props) {
    const route = useRoute();
    const habitId = route.params.habit;

    const { control, reset, handleSubmit, watch, formState: { errors }, register } = useForm({
        mode: 'onSubmit',
        defaultValues: {
            title: props.habits[habitId].title,
            limit: props.habits[habitId].limit,
            category: props.habits[habitId].category,
            frequency: props.habits[habitId].frequency,
        }
    });

    const watchCategoryPicker = watch("category", false);

    const updateHabit = (formData) => {
        var category;
        formData.newCategory ? category = formData.newCategory : category = formData.category;
        props.updateHabit(formData.title, formData.limit, category, formData.frequency, habitId);
        props.navigation.navigate('Log');
    }

    return (
        <KeyboardAvoidingView behavior='padding'>
            <ScrollView>
                <Paragraph style={styles(props.theme).topText}>Edit habit</Paragraph>
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
                            label="Limit"
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
                                testID="frequency-input"
                            >
                                <Picker.Item label="Daily" value="Daily" key="Daily" testID="select-daily-frequency" />
                                <Picker.Item label="Weekly" value="Weekly" key="Weekly" testID="select-weekly-frequency" />
                                <Picker.Item label="Monthly" value="Monthly" key="Monthly" testID="select-monthly-frequency" />
                            </Picker>
                        </View>
                    )}
                    name="frequency"
                    rules={{ required: true }}
                />
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
                <Button onPress={handleSubmit(updateHabit)}>Save</Button>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const mapStateToProps = (state) => ({
    categories: [...new Set((Object.values(state.habits.habits)).map((item) => item.category))].filter(item => item != "" && item != undefined).sort(),
    habits: state.habits.habits
})

const mapDispatchToProps = (dispatch) => {
    return {
        updateHabit: (title, limit, category, frequency, id) => dispatch(updateHabit({ updated: (new Date()).valueOf(), title: title, limit: limit, category: category, frequency: frequency, habitId: id }))
    }
}

export default withTheme(connect(mapStateToProps, mapDispatchToProps)(EditHabit));