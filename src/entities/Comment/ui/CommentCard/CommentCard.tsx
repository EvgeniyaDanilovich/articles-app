import React, { memo, useCallback } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Text } from 'shared/ui/Text/Text';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import { AppLink } from 'shared/ui/AppLink/AppLink';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import cls from './CommentCard.module.scss';
import { Comment } from '../../model/types/comment';

interface CommentCardProps {
    className?: string;
    comment?: Comment;
    isLoading?: boolean;
}

export const CommentCard = memo(({ comment, isLoading, className }: CommentCardProps) => {
    if (isLoading) {
        return (
            <div className={classNames(cls.CommentCard, {}, [className])}>
                <div className={cls.header}>
                    <Skeleton width={40} height={40} border="50%" />
                    <Skeleton width={100} height={20} className={cls.username} />
                </div>
                <Skeleton width="100%" height={50} />
            </div>
        );
    }

    if (!comment) return null;

    return (
        <div className={classNames(cls.CommentCard, {}, [className])}>
            <AppLink to={`${RoutePath.profile}${comment.user.id}`} className={cls.header}>
                {comment.user.avatar ? <Avatar src={comment.user.avatar} size={30} /> : null}
                <Text title={comment.user.username} className={cls.username} />
            </AppLink>
            <Text text={comment.text} />
        </div>
    );
});
