import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { getAllPosts } from '../../services/posts/posts.service';
import PostCard from './PostCard.jsx';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
   
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getAllPosts();
        if (!response) {
          throw new Error('Failed to fetch data');
        }
        const data = response.data.data;
        setPosts(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();

  }, []);

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.postContainer}>
        {posts.map(post => (
          <View key={post._id} style={styles.postCardContainer}>
            <PostCard post={post} />
          </View>
        ))}
      </View>
      {loading ? <ActivityIndicator size="large" color="#000" /> : null}
  
    </View>
  );
};

const styles = StyleSheet.create({
  postContainer: {
    alignItems: 'center',
    marginTop: 16,
  },
  postCardContainer: {
    width: '150%',
    marginTop: 10,
    height: 400,
  },
});

export default PostList;
