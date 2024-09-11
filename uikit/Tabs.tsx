'use client'

import { useState, Children, cloneElement, useEffect } from 'react'

import { Badge } from '@mui/material'

import { Colors } from 'definitions/types/Colors'

import Button, { ButtonSize } from './Button'

type Tabs = {
  children: React.ReactElement<Tab>[] | React.ReactElement<Tab>
  tabsWidth?: 'full' | 'auto'
  tabsHeight?: ButtonSize
  tabsPadding?: 'small' | 'large'
  className?: string
  color: Colors
  defaultSelectedTab?: string | number
}
type ChildrenTab = {
  Tab: React.FC<Tab>
}

let selectedTabContent: React.ReactNode | undefined = undefined

const Tabs = (props: Tabs) => {
  const { tabsWidth = 'auto', tabsHeight, tabsPadding = 'small' } = props
  const firstTab = Children.toArray(props.children)[0] as React.ReactElement<Tab>

  const firstTabKeyIndex = firstTab.props.tabKey ?? 0
  const [selectedTab, setSelectedTab] = useState<string | number>(props.defaultSelectedTab ?? firstTabKeyIndex)
  const changeActiveTab = (tabKey: string | number) => setSelectedTab(tabKey)

  useEffect(() => {
    if (props.defaultSelectedTab) changeActiveTab(props.defaultSelectedTab)
  }, [props.defaultSelectedTab])

  return (
    <>
      <div
        className={`overflow-x-hidden rounded-xl  ${tabsWidth === 'full' ? 'w-full p-1' : 'inline-block whitespace-nowrap'} ${props.className ?? ''}`}
      >
        <div className={`slider items-center rounded-xl `}>
          <div className={`flex gap-2 ${tabsWidth === 'full' ? 'w-full' : ''} items-center rounded-xl bg-gray-50 px-2 py-2.5`}>
            {Children.map(props.children, (child: React.ReactElement<Tab>, i: number) => {
              if (!child?.props) return null

              const { children, tabKey = i, ...restTabProps } = child.props as Tab
              if (selectedTab === tabKey) selectedTabContent = children
              const onTabClick = () => {
                changeActiveTab(tabKey)
                restTabProps?.onClick && restTabProps.onClick()
              }
              const tabProps = {
                ...restTabProps,
                isSelected: selectedTab === tabKey,
                onClick: onTabClick,
                color: restTabProps.color ? restTabProps.color : props.color,
                tabsWidth,
                tabsHeight,
                tabsPadding,
              }
              if (child && child.type === Tab)
                return <div className={`${props.tabsWidth === 'full' ? 'w-full grow' : ''} `}>{cloneElement(child, tabProps)}</div>
            })}
          </div>
        </div>
      </div>
      {selectedTabContent && (
        <div className="mt-4" key={selectedTab}>
          {selectedTabContent}
        </div>
      )}
    </>
  )
}

type Tab = {
  tabText: string
  isTabHidden?: boolean
  href?: string
  asLink?: boolean
  isSelected?: boolean
  color?: Colors
  textColor?: Colors
  children?: React.ReactNode[] | React.ReactNode
  disabled?: boolean
  tooltip?: string
  tooltipPlacement?: 'top' | 'bottom' | 'left' | 'right'
  tooltipColor?: Colors
  tooltipTextColor?: Colors
  tabKey?: string | number
  className?: string
  badge?: string | number
  onClick?: () => void
}

type TabProps = {
  tabsWidth?: 'full' | 'auto'
  tabsHeight?: ButtonSize
  tabsPadding?: 'small' | 'medium' | 'large'
} & Tab

const Tab = (props: TabProps) => {
  const { color = 'black' } = props
  const selectedVariant = 'contained'
  const selectedTextColor = 'white'
  const selectedTheme: Colors = props.isSelected ? color : 'gray-400'
  const tabPadding = props.tabsPadding === 'large' ? 'px-10' : props.tabsPadding === 'medium' ? 'px-4' : 'px-2'
  const tabWidth = props.tabsWidth === 'full' ? 'w-full' : ''
  const tabShadow = props.isSelected ? 'shadow-md' : ''

  if (props.isTabHidden) return null
  return (
    <Badge className="block" badgeContent={props.badge} color="error" invisible={!Boolean(props.badge)}>
      <Button
        color={selectedTheme}
        textColor={selectedTextColor}
        variant={selectedVariant}
        size={props.tabsHeight ?? 'medium'}
        className={`${tabWidth} ${tabShadow} ${tabPadding} ${props.className ?? ''}`}
        onClick={props.onClick}
        disabled={props.disabled}
      >
        {props.tabText}
      </Button>
    </Badge>
  )
}

Tabs.Tab = Tab

export default Tabs
export { Tabs }
