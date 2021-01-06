import React,{useEffect,useState} from 'react'
import { useDispatch,useSelector} from 'react-redux';
import { getAllPublicBlog } from "../../Redux/Blog/BlogAction";
import { IsEmpty } from '../../Services/Service';
import Privateheader from '../header/Privateheader';
import Loader from 'react-loader-spinner'
import { Card, Col, Row } from 'antd';
import { useHistory } from 'react-router-dom';

function Allblog() {
     const dispatch = useDispatch()
     const history = useHistory()
  const { Meta } = Card;

    useEffect(() => {
        dispatch(getAllPublicBlog())
    },[])
    const alldata = useSelector(state => state.PublicBlogData.Blog)
const cardclick=(data)=>{
    console.log("data",data);
    history.push('/allblogaction', data)

}
    return (
        <div>
            <Privateheader title="allblog">

            <div className="mt-3">
          {IsEmpty(alldata) &&
            <Loader type="ThreeDots" className="loder" color="#00BFFF" height={80} width={80} />}

          <div className="site-card-wrapper">
            <Row gutter={16}>
              {!IsEmpty(alldata) &&
                alldata.map((data) => {
                  { console.log("sasas", data) }
                  return (
                    <div className="Blog">
                      <Col span={8}>
                        <Card
                          hoverable
                          style={{ width: 360 }}
                          onClick={()=>cardclick(data)}
                          className="Blogcard"
                          cover={<img alt="example" height="250px" src={process.env.REACT_APP_API +'/'+ data.blogImagePath} />}
                        >
                          <div className="row">
                            <div className="col-8">
                              <Meta
                                title={data.blogTitle}
                                description={data.blogContent}
                              />
                            </div>
                            <div className="col-4">
                            </div>
                          </div>
                          <div className="row allicon">
                            <div className="col-6">
                              {/* <img src={CommentIcon} onClick={() => GotoComment(data)} className="commenticon" /> */}
                            </div>
                            <div className="col-6">
                              {/* <img src={Delete} onClick={() => { DeleteBlog(data._id) }} className="deleteicon" /> */}

                            </div>
                          </div>
                        </Card>
                      </Col>
                    </div>
                  );
                })}
            </Row>
          </div>
        </div>

            </Privateheader>
        </div>
    )
}

export default Allblog
