import {Component} from 'react'
import Loader from 'react-loader-spinner'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './index.css'

class BlogItemDetails extends Component {
  state = {blogData: {}, isLoading: true}

  componentDidMount() {
    this.fetchBlogData()
  }

  fetchBlogData = async () => {
    const {match} = this.props
    const {id} = match.params
    const response = await fetch(`https://apis.ccbp.in/blogs/${id}`)
    const data = await response.json()
    const updatedData = {
      title: data.title,
      imageUrl: data.image_url,
      avatarUrl: data.avatar_url,
      content: data.content,
      author: data.author,
      topic: data.topic,
    }
    this.setState({blogData: updatedData, isLoading: false})
  }

  renderBlogDetails = () => {
    const {blogData} = this.state
    const {title, imageUrl, avatarUrl, content, author} = blogData

    return (
      <div className="blog-info">
        <h2 className="blog-title">{title}</h2>
        <div className="author-info">
          <img src={avatarUrl} className="author-avatar" alt={author} />
          <p className="author-name">{author}</p>
        </div>
        <img src={imageUrl} className="blog-image" alt={title} />
        <p className="blog-content">{content}</p>
      </div>
    )
  }

  render() {
    const {isLoading} = this.state
    return (
      <div className="blog-container">
        {isLoading ? (
          <div data-testid="loader">
            <Loader type="TailSpin" color="#00bfff" height={50} width={50} />
          </div>
        ) : (
          this.renderBlogDetails()
        )}
      </div>
    )
  }
}

export default BlogItemDetails
