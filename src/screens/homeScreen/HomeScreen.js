import React, { useEffect } from 'react';
import { Container, Col } from "react-bootstrap"
import { useDispatch, useSelector } from 'react-redux';
import CategoriesBar from '../../components/categoriesBar/CategoriesBar';
import Video from '../../components/video/Video';
import { getPopularVideos, getVideosByCategory } from '../../redux/actions/videos.action';

import InfiniteScroll from 'react-infinite-scroll-component';
import SkeletionVideo from '../../components/skeletons/SkeletionVideo';

const HomeScreen = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPopularVideos())
  }, [dispatch]);

  const { videos, activeCategory, loading } = useSelector(state => state.homeVideos)

  const fetchData = () => {
    if (activeCategory === 'All') {
      console.log('call1');
      dispatch(getPopularVideos())
    }
    else {
      console.log('call2');

      dispatch(getVideosByCategory(activeCategory))
    }
  }

  return (
    <Container>
      <CategoriesBar />
      <InfiniteScroll
        dataLength={videos.length}
        next={fetchData}
        hasMore={true}
        loader={
          <div className="spinner-border text-danger d-block mx-auto"></div>
        }
        className='row'
        style={{ overflow: 'unset' }}
      >
        {
          !loading ? videos.map((video) =>
            <Col lg={3} md={4}>
              <Video video={video} key={video.id} />
            </Col>)
            :
            (
              [...Array(20)].map(() => {
                return (
                  <Col lg={3} md={4}>
                    {/* <Skeleton height={180} width="100%" /> */}
                    <SkeletionVideo />
                  </Col>
                )
              })
            )
        }
      </InfiniteScroll>
    </Container >
  )
}

export default HomeScreen
