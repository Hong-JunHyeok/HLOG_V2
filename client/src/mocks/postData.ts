import { PostType } from '@/types/Post';
import { LoremIpsum } from 'lorem-ipsum';
import stringCutter from '@/utils/stringCutter';

const lorem = new LoremIpsum();

export const getPopularPostsMock = (generateNumber: number) => {
  const postsData:PostType[] = [];
  for(let i = 0; i < generateNumber; i ++) postsData.push({
    id: i,
    createdAt: new Date(),
    postTitle: stringCutter(lorem.generateSentences(), 50),
    postContent: lorem.generateParagraphs(100),
    postThumnail: 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbdWfeI%2Fbtrrqbac3yW%2FatUgYrp5RN4OWSL2ezH3r0%2Fimg.png',
    user: {
      email: 'edb1631@naver.com',
      createdAt: new Date(),
      id: 1,
      profileUrl: '',
      selfIntroduction: '',
      username: '홍준혁'
    }
  })

  return postsData.sort((a, b) => +b.createdAt - +a.createdAt);
}

export const getRecentPostsMock = (generateNumber: number) => {
  const postsData:PostType[] = [];
  for(let i = 0; i < generateNumber; i ++) postsData.push({
    id: i,
    createdAt: new Date(),
    postTitle: stringCutter(lorem.generateSentences(), 50),
    postContent: lorem.generateParagraphs(100),
    postThumnail: 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbdWfeI%2Fbtrrqbac3yW%2FatUgYrp5RN4OWSL2ezH3r0%2Fimg.png',
    user: {
      email: 'edb1631@naver.com',
      createdAt: new Date(),
      id: 1,
      profileUrl: '',
      selfIntroduction: '',
      username: '홍준혁'
    }
  })

  return postsData.sort((a, b) => +b.createdAt - +a.createdAt);
}

export const postMock: PostType = {
  id: 1,
  createdAt: new Date(),
  postContent: 'Hello',
  postThumnail: '',
  postTitle: 'Lorem',
  user: {
    email: 'edb1631@naver.com',
    createdAt: new Date(),
    id: 1,
    profileUrl: '',
    selfIntroduction: '',
    username: '홍준혁'
  }
};
