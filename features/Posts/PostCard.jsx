import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import axios from 'axios';
import { Feather } from '@expo/vector-icons'; 

const PostCard = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes.count);

  const handleLikeClick = async () => {
    try {
      const url = liked ? 'https://minly-social-network-backend.onrender.com/api/v1/media/un-like' : 'https://minly-social-network-backend.onrender.com/api/v1/media/like';
      const response = await axios.post(url, { mediaId: post._id, userId: post.uploaderUserId._id });
      console.log('Like response:', response.data);
      setLikesCount(response.data.data.likes.count);
      setLiked(!liked);
    } catch (error) {
      console.error('Error liking/unliking post:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <TouchableOpacity style={styles.profileIcon}>
          <Text style={styles.profileIconText}>
            <Feather name="user" size={24} color="#555" />
          </Text>
        </TouchableOpacity>
        <Text style={styles.username}>
          {post.uploaderUserId.firstName} {post.uploaderUserId.lastName}
        </Text>
      </View>
      <Image
        style={styles.image }
        source={{ uri:  post.mediaUrl }}
        resizeMode="cover"
      />
      <View style={styles.interaction}>
        <TouchableOpacity
          onPress={handleLikeClick}
          style={[styles.likeButton, { backgroundColor: liked ? '#007bff' : '#eee' }]}
        >
          <Text style={{ color: liked ? '#fff' : '#333' }}>
            {liked ? 'Unlike' : 'Like'}
          </Text>
        </TouchableOpacity>
        <Text style={styles.likesCount}>{likesCount}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    margin: 10,
  },
  userInfo: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileIcon: {
    height: 40,
    width: 40,
    marginRight: 10,
    backgroundColor: '#fff',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileIconText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  interaction: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  likeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  likesCount: {
    marginLeft: 10,
    color: '#333',
    fontSize: 16,
  },
});

export default PostCard;
