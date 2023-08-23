import {Button} from 'antd'
import Image from 'next/image'
import styles from './page.module.css'
import type {
  Metadata,
  ResolvingMetadata
} from 'next'
import {Card, Space} from 'antd'

export const generateMetadata = (): Metadata => {
  return {
    title: '关于任霏'
  }
}

export default () => {
  return (
    <>
      <Space direction="vertical" size={16}>
        <Card title="Default size card" extra={<a href="#">More</a>} style={{width: 300}}>
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>
        </Card>
        <Card size="small" title="Small size card" extra={<a href="#">More</a>} style={{width: 300}}>
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>
        </Card>
      </Space>
    </>
  )
}
