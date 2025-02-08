import type { Meta, StoryObj } from '@storybook/react';
import FooterComponent from 'src/components/Footer';
import HeaderComponent from 'src/components/Header';
import Layout from './Layout';
import RegisterHeader from 'src/components/RegisterHeader';
import CartHeader from 'src/components/CartHeader';

// Cấu hình của Storybook
const meta: Meta<typeof Layout> = {
  title: 'Shopee/Layout',
  component: Layout,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Story cho Layout component
export const Primary: Story = {
  args: {
    children: 'Button', // Bạn có thể thay 'Button' bằng nội dung cụ thể cho children nếu cần
    Header: <HeaderComponent />, // Truyền HeaderComponent vào Layout
    Footer: <FooterComponent />, // Truyền FooterComponent vào Layout
  },
};
export const LoginLayout: Story = {
  args: {
    children: 'Button', // Bạn có thể thay 'Button' bằng nội dung cụ thể cho children nếu cần
    Header: <RegisterHeader />, // Truyền HeaderComponent vào Layout
    Footer: <FooterComponent />, // Truyền FooterComponent vào Layout
  },
};
export const CartLayout: Story = {
  args: {
    children: 'Button', // Bạn có thể thay 'Button' bằng nội dung cụ thể cho children nếu cần
    Header: <CartHeader />, // Truyền HeaderComponent vào Layout
    Footer: <FooterComponent />, // Truyền FooterComponent vào Layout
  },
};
