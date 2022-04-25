import { useQuery } from 'react-query';
import axios,{ AxiosResponse } from 'axios';
import { PostType } from '@/types/Post';
import { ResponseType } from '@/types/ResponseType';

interface PostResponseType {
  posts: PostType[]
}

export function getRecentPost() {
  return axios.get(process.env.API_SERVER_URL + '/post');
}

export function usePopularPosts() {
  return useQuery<AxiosResponse<ResponseType<PostResponseType>>>('popular_posts', getRecentPost);
}

export function getPopularPost() {
  return axios.get(process.env.API_SERVER_URL + '/post');
}

export function useRecentPosts() {
  return useQuery<AxiosResponse<ResponseType<PostResponseType>>>('recent_posts', getPopularPost);
}

