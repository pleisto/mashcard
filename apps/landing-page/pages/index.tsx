import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { Pagination, Mousewheel, EffectFade } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import { Icon } from '@brickdoc/design-system'
import {
  SwiperContainer,
  SectionBg,
  Section1Title,
  Section1Comment,
  Section2Title,
  Section2Comment,
  JoinButton,
  LinkList,
  LinkBlock,
  SectionWrapper,
  SectionLogoWrapper
} from '../styles/home.style'
import { useEffect, useState } from 'react'

const section1bg = 'url(/home/sec1.jpg)'
const section2bg = 'url(/home/sec2.jpg)'

const ratio = 30

const Home: NextPage = () => {
  const [bgStyle, setBgStyle] = useState<React.CSSProperties>({})
  useEffect(() => {
    const showMousePosition = (e: MouseEvent) => {
      const { pageX, pageY } = e
      setBgStyle({
        backgroundPosition: `calc(50% - ${pageX / ratio}px) calc(50% - ${pageY / ratio}px)`
      })
    }
    document.addEventListener('mousemove', showMousePosition, false)
    return () => document.removeEventListener('mousemove', showMousePosition)
  }, [])
  return (
    <div>
      <Head>
        <title>Brickdoc</title>
        <meta name="Brickdoc" content="Brickdoc" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <SwiperContainer>
        <Swiper
          direction="vertical"
          mousewheel={true}
          pagination={{
            clickable: true
          }}
          speed={500}
          effect="slide"
          fadeEffect={{
            crossFade: true
          }}
          modules={[Pagination, Mousewheel, EffectFade]}>
          <SwiperSlide>
            <SectionBg style={{ ...bgStyle, backgroundImage: section1bg }}></SectionBg>
            <SectionWrapper>
              <SectionLogoWrapper>
                <Image
                  className="SectionLogoCls"
                  height={50}
                  width={220}
                  src="/home/logo_en_dark.svg"
                  alt="Picture of the author"
                />
              </SectionLogoWrapper>
              <Section1Title>
                <Image height={220} width={946} src="/home/title1.svg" alt="Picture of the author" />
              </Section1Title>
              <Section1Comment>OUR WEBSITE IS COMING SOON</Section1Comment>
            </SectionWrapper>
          </SwiperSlide>
          <SwiperSlide>
            <SectionBg style={{ ...bgStyle, backgroundImage: section2bg }}></SectionBg>
            <SectionWrapper>
              <Section2Title>
                <Image height={49} width={909} src="/home/title2.svg" alt="Picture of the author" />
              </Section2Title>
              <Section2Comment>
                Brickdoc is an open source online workspace and low-code
                <br />
                development platform with Compound Document as its core.
              </Section2Comment>
              <JoinButton type="primary">Apply to join our Private </JoinButton>
              <LinkList>
                <LinkBlock>
                  <div className="icon">
                    <Icon.Twitter />
                  </div>
                  <div className="label">Twitter</div>
                </LinkBlock>
                <LinkBlock>
                  <div className="icon">
                    <Icon.Github />
                  </div>
                  <div className="label">Github</div>
                </LinkBlock>
                <LinkBlock>
                  <div className="icon">
                    <Icon.Facebook />
                  </div>
                  <div className="label">Facebook</div>
                </LinkBlock>
              </LinkList>
            </SectionWrapper>
          </SwiperSlide>
        </Swiper>
      </SwiperContainer>
    </div>
  )
}

export default Home
