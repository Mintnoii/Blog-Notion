import * as React from 'react'
import cs from 'classnames'
import { IoSunnyOutline } from 'react-icons/io5'
import { IoMdMoon } from 'react-icons/io'
import { Header, Breadcrumbs, Search, useNotionContext } from 'react-notion-x'
import * as types from 'notion-types'
// import { navigationStyle, navigationLinks, isSearchEnabled } from 'lib/config'
import { navStyle } from 'lib/config'
import { themeModeState } from '@/model'
import { useRecoilState } from 'recoil'
const ToggleThemeButton = () => {
  const [isDarkMode, toggleDarkMode] = useRecoilState(themeModeState)
  return (
    <div
      className="breadcrumb button"
      onClick={() => {
        toggleDarkMode(!isDarkMode)
        console.log(isDarkMode, '===')
      }}
    >
      {isDarkMode ? <IoMdMoon /> : <IoSunnyOutline />}
    </div>
  )
}

export const PageHeader: React.FC<{
  block: types.CollectionViewPageBlock | types.PageBlock
}> = ({ block }) => {
  const { components, mapPageUrl } = useNotionContext()
  if (navStyle === 'default') {
    return <Header block={block} />
  }
  return (
    <header className="notion-header">
      <div className="notion-nav-header">
        <Breadcrumbs block={block} rootOnly={true} />

        <div className="notion-nav-header-rhs breadcrumbs">
          {/* <button>搜索</button>
          <button>归档</button>
          <button>标签</button> */}
          {/* {navigationLinks
            ?.map((link, index) => {
              if (!link.pageId && !link.url) {
                return null
              }

              if (link.pageId) {
                return (
                  <components.PageLink
                    href={mapPageUrl(link.pageId)}
                    key={index}
                    className={cs(styles.navLink, 'breadcrumb', 'button')}
                  >
                    {link.title}
                  </components.PageLink>
                )
              } else {
                return (
                  <components.Link
                    href={link.url}
                    key={index}
                    className={cs(styles.navLink, 'breadcrumb', 'button')}
                  >
                    {link.title}
                  </components.Link>
                )
              }
            })
            .filter(Boolean)} */}

          <ToggleThemeButton />

          {/* {isSearchEnabled && <Search block={block} title={null} />} */}
        </div>
      </div>
    </header>
  )
}
