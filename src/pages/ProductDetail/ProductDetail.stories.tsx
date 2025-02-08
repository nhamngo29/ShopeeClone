import type { Meta, StoryObj } from '@storybook/react';
import ProductDetail from './ProductDetail';
import { withRouter, reactRouterParameters } from 'storybook-react-router';


// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Shopee/ProductDetail',
  component: ProductDetail,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs']
} satisfies Meta<typeof ProductDetail>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  decorators: [withRouter],
  parameters: {
    reactRouter: reactRouterParameters({
      location: {
        pathParams: { nameId: 'Mã-FAMAYMA2-gim-10K-don-50K-Áo-thun-nam-n-form-rng-Yinxx-áo-phông-tay-l-ATL43-i.f6d58fb8-8b29-45b8-805d-e3af051c8445' },
      },
      routing: { path: '/users/:userId' },
    }),
  },
};