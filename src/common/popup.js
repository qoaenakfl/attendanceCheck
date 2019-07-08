import { Modal } from "../component/login/node_modules/antd";

export const popErrorModal = (title, message) => {
  Modal.error({
    title,
    content: message
  });
};
