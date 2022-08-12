import ProfileForm from '../ProfileForm/ProfileForm';
import {useForm} from 'react-hook-form';
import ProfileInputField from '../ProfileInputField/ProfileInputField';
import {useDispatch, useSelector} from 'react-redux';
import {selectUser} from '../../store/selectors/user/user-selectors';
import {updateUserDetails} from '../../store/slices/user/userAction';
import Preloader from '../Preloader/Preloader';
import {CONNECTION_ERROR} from '../../utils/constants';
import {emailRules, firstNameRule} from '../../utils/inputValidationRules';

export default function Profile() {

    // redux && user register status
    const dispatch = useDispatch();
    const { loading, error, userInfo } = useSelector(selectUser)

    // react-hook-form
    const {
        register,
        handleSubmit,
        formState: {
            errors,
            isValid,
            isDirty
        },
        getValues,
        reset,
    } = useForm({
        mode: 'onChange',
        defaultValues: {
            profileName: userInfo.name,
            profileEmail: userInfo.email
        },
    })

    // reset устанавливает новые дефолтные значения, при этом кнопка редактирования становится недоступна
    function onSubmit() {
        const { profileName: name, profileEmail: email } = getValues();
        dispatch(updateUserDetails({ name, email }))

        reset({
            profileName: name,
            profileEmail: email
        });
    }

    return (
        <section>
            <ProfileForm
                onSubmit={handleSubmit(onSubmit)}
                title={`Привет, ${userInfo.name}!`}
                buttonText='Редактировать'
                submitDisabled={!isValid || !isDirty}
            >
                <ProfileInputField
                    label='Имя'
                    name='profileName'
                    register={register}
                    validationRules={firstNameRule}
                    errors={errors}
                    disabled={loading}
                />

                <ProfileInputField
                    label="Email"
                    name="profileEmail"
                    register={register}
                    validationRules={emailRules}
                    errors={errors}
                    type="email"
                    disabled={loading}
                />

                {loading && <Preloader isSmall={true}/>}

                {error && <p className='register__error'>{CONNECTION_ERROR}</p>}
            </ProfileForm>
        </section>
    )
}
