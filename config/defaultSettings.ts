import { Settings as LayoutSettings } from '@ant-design/pro-layout';
import logo from '@/assets/logo.jpg';

const Settings: LayoutSettings & {
  pwa?: boolean;
  logo?: string;
} = {
  navTheme: 'light',
  // 拂晓蓝
  primaryColor: '#1890ff',
  layout: 'mix',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: false,
  title: 'My Template Pro',
  pwa: false,
  logo: logo,
  iconfontUrl: '',
};

export default Settings;
