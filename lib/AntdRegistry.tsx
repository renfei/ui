'use client'

import React, {useState} from 'react'
import {StyleProvider, createCache, extractStyle} from '@ant-design/cssinjs'
import {
  useServerInsertedHTML,
  useRouter
} from 'next/navigation'
import {
  GithubFilled,
  InfoCircleFilled,
  LogoutOutlined,
  QuestionCircleFilled,
  GithubOutlined,
  BulbOutlined,
  BulbFilled,
} from '@ant-design/icons'
import {
  ProConfigProvider,
  ProLayout,
  DefaultFooter,
} from '@ant-design/pro-components'
import {
  ConfigProvider,
  Dropdown,
  theme,
} from 'antd'
import mainMenu from '../lib/_mainMenu'
import SearchInput from '../lib/SearchInput'

const StyledComponentsRegistry = ({children}: { children: React.ReactNode }) => {
  const cache = createCache()
  const router = useRouter()
  const [pathname, setPathname] = useState('/');
  const [dark, setDark] = useState(false)
  useServerInsertedHTML(() => (
    <style id="antd" dangerouslySetInnerHTML={{__html: extractStyle(cache, true)}}/>
  ))
  return (
    <div id={"renfei-layout"}>
      <ProConfigProvider dark={dark}>
        <ConfigProvider
          theme={dark ? {
            token: {
              colorPrimary: '#177ddc'
            },
            algorithm: [theme.darkAlgorithm,]
          } : {
            algorithm: [theme.defaultAlgorithm,]
          }}
          getTargetContainer={() => {
            return document.getElementById('renfei-layout') || document.body;
          }}
        >
          <ProLayout
            layout={'top'}
            fixedHeader
            fixSiderbar
            splitMenus
            title="任霏博客"
            logo={dark ? "https://cdn.renfei.net/Logo/RF_white.svg" : "https://cdn.renfei.net/Logo/RF.svg"}
            pageTitleRender={false}
            {...mainMenu}
            location={{
              pathname,
            }}
            token={{
              header: {
                colorBgMenuItemSelected: 'rgba(0,0,0,0.04)',
              }
            }}
            siderMenuType="group"
            menu={{
              collapsedShowGroupTitle: true,
            }}
            avatarProps={{
              src: 'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
              size: 'small',
              title: '任霏',
              render: (props, dom) => {
                return (
                  <Dropdown
                    menu={{
                      items: [
                        {
                          key: 'logout',
                          icon: <LogoutOutlined/>,
                          label: '退出登录',
                        },
                      ],
                    }}
                  >
                    {dom}
                  </Dropdown>
                );
              },
            }}
            actionsRender={(props) => {
              if (props.isMobile) return [];
              if (typeof window === 'undefined') return [];
              return [
                props.layout !== 'side' && document.body.clientWidth > 1400 ? (
                  <SearchInput/>
                ) : undefined,
                <InfoCircleFilled key="InfoCircleFilled"/>,
                <QuestionCircleFilled key="QuestionCircleFilled"/>,
                <GithubFilled key="GithubFilled"/>,
                dark ? (<BulbOutlined key="BulbOutlined" onClick={() => {
                  setDark(!dark)
                }}/>) : (<BulbFilled key="BulbFilled" onClick={() => {
                  setDark(!dark)
                }}/>),
              ];
            }}
            menuFooterRender={(props) => {
              if (props?.collapsed) return undefined;
              return (
                <div
                  style={{
                    textAlign: 'center',
                    paddingBlockStart: 12,
                  }}
                >
                  <div>© 2023 RENFEI</div>
                  <div>by RENFEI.NET</div>
                </div>
              );
            }}
            onMenuHeaderClick={(e) => {
            }}
            menuItemRender={(item, dom) => (
              <div
                onClick={() => {
                  setPathname(item.path || '/welcome')
                  router.push(item.path ? item.path : "/")
                }}
              >
                {dom}
              </div>
            )}
          >
            <StyleProvider cache={cache}>{children}</StyleProvider>
            <DefaultFooter
              copyright="2023 RENFEI.NET"
              links={[
                {
                  key: 'Ant Design Pro',
                  title: 'Ant Design Pro',
                  href: 'https://pro.ant.design',
                  blankTarget: true,
                },
                {
                  key: 'github',
                  title: <GithubOutlined/>,
                  href: 'https://github.com/ant-design/ant-design-pro',
                  blankTarget: true,
                },
                {
                  key: 'Ant Design',
                  title: 'Ant Design',
                  href: 'https://ant.design',
                  blankTarget: true,
                },
              ]}
            />
          </ProLayout>
        </ConfigProvider>
      </ProConfigProvider>
    </div>
  )
}

export default StyledComponentsRegistry;