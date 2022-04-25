import { AxiosResponse } from 'axios';
import { useQuery } from 'react-query';
import { ResponseType } from '@/types/ResponseType';
import { PostType } from '@/types/Post';

export default function withPostList(WrappedComponent: React.FunctionComponent, {
  key,
  fetcher
}) {
  const PostList = () => {
    const { data } = useQuery<AxiosResponse<ResponseType<{ posts: PostType[] }>>>(key, fetcher);
    const { posts } = data.data.payload;

    return (
      <WrappedComponent 
        {...this.props} 
        posts={posts}    
      />
    )
  };

  return PostList;
}
