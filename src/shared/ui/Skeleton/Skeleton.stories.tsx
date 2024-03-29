import type { Meta } from '@storybook/react';
import { StoryObj } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { Skeleton } from './Skeleton';

const meta: Meta<typeof Skeleton> = {
    title: 'shared/Skeleton',
    component: Skeleton,
    tags: ['autodocs'],
    argTypes: {
        // backgroundColor: { control: 'color' },
    },
};

export default meta;

type Story = StoryObj<typeof Skeleton>;

export const Normal: Story = {
    args: {
        width: 200,
        height: 200,
    },
};

export const Circle: Story = {
    args: {
        width: 200,
        height: 200,
        border: '50%',
    },
};

export const NormalDark: Story = {
    args: {
        width: '100%',
        height: 200,
    },
};

NormalDark.decorators = [ThemeDecorator(Theme.DARK)];

export const CircleDark: Story = {
    args: {
        width: 200,
        height: 200,
        border: '50%',

    },
};

CircleDark.decorators = [ThemeDecorator(Theme.DARK)];
