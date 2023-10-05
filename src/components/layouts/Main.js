import { Affix, Drawer, Layout } from "antd";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Sidenav from "../Sidenav/Sidenav";
import Footer from "./Footer";
import Header from "./Header";
import styles from "./Main.module.css";

const { Header: AntHeader, Content, Sider } = Layout;

function Main({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const [sideNavOpenKeys, setSideNavOpenKeys] = useState("");

  const sideNavOpenKeysHandler = (val) => {
    setSideNavOpenKeys(val);
  };

  const handleCollapsed = (val) => {
    setCollapsed(val);
  };

  const [visible, setVisible] = useState(false);
  const [placement, setPlacement] = useState("right");
  const [sidenavColor, setSidenavColor] = useState("#1890ff");
  const [sidenavType, setSidenavType] = useState("transparent");
  const [fixed, setFixed] = useState(false);

  const openDrawer = () => setVisible(!visible);
  const handleSidenavType = (type) => setSidenavType(type);
  const handleSidenavColor = (color) => setSidenavColor(color);
  const handleFixedNavbar = (type) => setFixed(type);

  let { pathname } = useLocation();
  pathname = pathname.replace("/", " ");

  const pathArr = pathname.split("/");

  useEffect(() => {
    if (pathname === "rtl") {
      setPlacement("left");
    } else {
      setPlacement("right");
    }
  }, [pathname]);

  const isLogged = Boolean(localStorage.getItem("isLogged"));

  return (
    <Layout className={styles.mainLayout}>
      {isLogged && (
        <Drawer
          title={false}
          placement={placement === "right" ? "left" : "right"}
          closable={false}
          onClose={() => setVisible(false)}
          visible={visible}
          key={placement === "right" ? "left" : "right"}
          width={220}
        >
          <Layout>
            <Sider
              trigger={null}
              width={220}
              theme='light'
              className={styles.siderDrawer}
            >
              <Sidenav color={sidenavColor} sideNavOpenKeys={sideNavOpenKeys} />
            </Sider>
          </Layout>
        </Drawer>
      )}
      {isLogged && (
        <Sider
          breakpoint='lg'
          trigger={null}
          collapsible
          collapsed={collapsed}
          width={220}
          theme='light'
          className={styles.siderMain}
        >
          {collapsed ? (
            ""
          ) : (
            <div>
              <h2
                className='text-white text-center mt-2 mb-1 flex items-center justify-center gap-2'
                style={{ fontSize: "25px" }}
              >
                ERP
                <strong style={{ color: "#6ECCAF	", fontWeight: "bold" }}>
                  OS
                </strong>
              </h2>
            </div>
          )}
          {isLogged && (
            <Sidenav color={sidenavColor} sideNavOpenKeys={sideNavOpenKeys} />
          )}
        </Sider>
      )}
      <Layout
        className={
          isLogged
            ? collapsed
              ? styles.mainLayoutUncollapse
              : styles.mainLayoutCollapse
            : styles.mainLayoutMarginLeftZero
        }
      >
        {fixed ? (
          <Affix>
            <Header
              onPress={openDrawer}
              name={pathname}
              subName={pathname}
              handleSidenavColor={handleSidenavColor}
              handleSidenavType={handleSidenavType}
              handleFixedNavbar={handleFixedNavbar}
              collapsed={collapsed}
              handleCollapsed={handleCollapsed}
              isLogged={isLogged}
            />
            {/* <BreadcrumbCustom /> */}
          </Affix>
        ) : (
          <Affix>
            <Header
              onPress={openDrawer}
              name={pathname}
              subName={pathname}
              handleSidenavColor={handleSidenavColor}
              handleSidenavType={handleSidenavType}
              handleFixedNavbar={handleFixedNavbar}
              collapsed={collapsed}
              handleCollapsed={handleCollapsed}
            />
            {/* <BreadcrumbCustom /> */}
          </Affix>
        )}
        <Content className='mr-4'>{children}</Content>
        <Footer />
      </Layout>
    </Layout>
  );
}

export default Main;
