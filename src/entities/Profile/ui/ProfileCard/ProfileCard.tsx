import React, { memo, useCallback } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Input } from 'shared/ui/Input/Input';
import { Loader } from 'shared/ui/Loader/Loader';
import { Text, TextTheme, ThemeAlign } from 'shared/ui/Text/Text';
import { profileActions } from 'pages/ProfilePage';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import cls from './ProfileCard.module.scss';
import { Profile } from '../../models/type/profile';

interface ProfileCardProps {
    className?: string;
    data?: Profile;
    formData?: Profile;
    isLoading?: boolean;
    error?: string;
    readonly?: boolean;
}

export const ProfileCard = memo((props: ProfileCardProps) => {
    const { className, data, formData, isLoading, error, readonly } = props;
    const { t } = useTranslation('profile');
    const dispatch = useAppDispatch();

    const onChangeUsername = useCallback((value: string) => {
        dispatch(profileActions.updateProfile({ first: value || '' }));
    }, [dispatch]);

    const onChangeLastname = useCallback((value: string) => {
        dispatch(profileActions.updateProfile({ lastname: value || '' }));
    }, [dispatch]);

    const onChangeAge = useCallback((value: string) => {
        dispatch(profileActions.updateProfile({ age: Number(value) || undefined }));
    }, [dispatch]);

    const onChangeCity = useCallback((value: string) => {
        dispatch(profileActions.updateProfile({ city: value || '' }));
    }, [dispatch]);

    if (isLoading) return <Loader />;
    if (error) {
        return (
            <Text
                title={t('An error occurred while loading the profile')}
                text={t('Reload page')}
                theme={TextTheme.ERROR}
                align={ThemeAlign.CENTER}
            />
        );
    }

    return (
        <div className={classNames(cls.ProfileCard, {}, [className])}>
            {readonly
                ? (
                    <>
                        <div className={cls.row}>
                            <Text text={t('Your name')} theme={TextTheme.BLACK} />
                            <Text text={`: ${data?.first}`} theme={TextTheme.BLACK} />
                        </div>
                        <div className={cls.row}>
                            <Text text={t('Your lastname')} theme={TextTheme.BLACK} />
                            <Text text={`: ${data?.lastname}`} theme={TextTheme.BLACK} />
                        </div>
                        <div className={cls.row}>
                            <Text text={t('Age')} theme={TextTheme.BLACK} />
                            <Text text={`: ${data?.age}`} theme={TextTheme.BLACK} />
                        </div>
                        <div className={cls.row}>
                            <Text text={t('City')} theme={TextTheme.BLACK} />
                            <Text text={`: ${data?.city}`} theme={TextTheme.BLACK} />
                        </div>
                    </>
                )
                : (
                    <>
                        <Input
                            onChange={onChangeUsername}
                            type="text"
                            value={formData?.first}
                            className={cls.input}
                            placeholder={t('Your name')}
                        />
                        <Input
                            onChange={onChangeLastname}
                            type="text"
                            value={formData?.lastname}
                            className={cls.input}
                            placeholder={t('Your lastname')}
                        />
                        <Input
                            onChange={onChangeAge}
                            type="text"
                            value={formData?.age}
                            className={cls.input}
                            placeholder={t('Age')}
                        />
                        <Input
                            onChange={onChangeCity}
                            type="text"
                            value={formData?.country}
                            className={cls.input}
                            placeholder={t('City')}
                        />
                    </>
                )}
        </div>
    );
});
