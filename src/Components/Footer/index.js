import { Typography } from "antd";

function Footer(){
    return (
      <div className="appFooter">
        <Typography.Link href="https://www.google.com" target={'_blank'}>Privacy Policy</Typography.Link>
        <Typography.Link href="https://www.google.com" target={'_blank'}>Terms & Conditioins</Typography.Link>
        <Typography.Link href="https://www.google.com" target={'_blank'}>Return Policy</Typography.Link>
        <Typography.Link href="tel:+2349026517938" target={'_blank'}>+234 9026 517938</Typography.Link>
      </div>
    );
  }
  export default Footer;