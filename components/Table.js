import React, { useContext } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import AuthContext from '../context/AuthContext'

const Table = ({value}) => {
    let {jobs} = useContext(AuthContext);
    const router = useRouter();
    const posts = [...new Set(jobs.filter(k => k.dept === parseInt(value)).map(item => item.post))]
    console.log(posts);
    const column = [
        {heading: 'Post'},
        {heading: 'Apply'},
        {heading: 'Attachment'},
    ]
  return (
    <table>
        <thead>
            <tr>
            {column.map((item,idx) => <TableHead key={idx} item={item} />)}
            </tr>
        </thead>
        <tbody>
            {
                posts.map(post => (<tr key={post.id}>
                    <td>{post}</td>
                    <td><input type="image" src="/btn.png" onClick = {() => {router.push({pathname: '/reg',query: {post: post, dep: value}})}} height='30px' width='40px'/></td>
                    <td><input type="image" src="./pdf.png" onClick={() => router.push('./pdf')} height={40} width={40}/></td>
                </tr>))
            }
        </tbody>
    </table>
  )

}
const TableHead = ({item}) => <th>{item.heading}</th>

export default Table