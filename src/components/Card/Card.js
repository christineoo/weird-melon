import React, {PropTypes} from 'react'
import ReactMarkdown from 'react-markdown';
import CodeBlock from '../Post/CodeBlock';
import { Link } from 'react-router'

const Card = ({user, post}) => {
    let codeBlock = Object.assign({}, {
        CodeBlock: CodeBlock
    });

    let date = new Date(post.postTimestamp);
    let editButton = (user && user.uid == post.user_id) ?
        <Link className='edit-button' to={`/edit/${post.key}`}>Edit</Link>
        : '';
    return (
        <div className="card">
            <Link className='view-button' to={`/view/${post.key}`}>{post.title}</Link>
            {editButton}
            <p className="date-style">{`Post on ${date.toDateString()}`}</p>
            <ReactMarkdown
                 source={post.body}
                 renderers={codeBlock}
                 skipHtml = {true}
                 escapeHtml = {true}
             />
        </div>
    )
};

Card.propTypes = {
    post: PropTypes.object.isRequired
};

export default Card;