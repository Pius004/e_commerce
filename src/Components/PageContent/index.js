import AppRoutes from "../Routes";
import {FloatButton} from 'antd';

function PageContent(){
    return (
      <div className="pageContent">
      <AppRoutes />
      <FloatButton.BackTop />
      </div>
    );
  }
  export default PageContent;