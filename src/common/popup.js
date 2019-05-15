import { Modal } from 'antd';

export const popErrorModal = (title, message) => {
    Modal.error({
      title,
      content: message
    });
};