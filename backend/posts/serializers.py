from rest_framework import serializers
from .models import Post, Comment, Like
from django.contrib.auth import get_user_model

User = get_user_model()


class CommentSerializer(serializers.ModelSerializer):
    """
    Serializer for comments with author details
    """
    author_name = serializers.CharField(source='author.username', read_only=True)
    author_avatar = serializers.ImageField(source='author.avatar', read_only=True)
    
    class Meta:
        model = Comment
        fields = ('id', 'post', 'author', 'author_name', 'author_avatar', 'content', 'created_at')
        read_only_fields = ('id', 'author', 'created_at')


class PostSerializer(serializers.ModelSerializer):
    """
    Serializer for posts with like/comment counts and user interaction status
    """
    author_name = serializers.CharField(source='author.username', read_only=True)
    author_avatar = serializers.ImageField(source='author.avatar', read_only=True)
    like_count = serializers.SerializerMethodField()
    comment_count = serializers.SerializerMethodField()
    user_has_liked = serializers.SerializerMethodField()
    comments = CommentSerializer(many=True, read_only=True)
    
    class Meta:
        model = Post
        fields = ('id', 'author', 'author_name', 'author_avatar', 'title', 'content', 
                  'image', 'created_at', 'updated_at', 'like_count', 'comment_count', 
                  'user_has_liked', 'comments')
        read_only_fields = ('id', 'author', 'created_at', 'updated_at')

    def get_like_count(self, obj):
        return obj.likes.count()

    def get_comment_count(self, obj):
        return obj.comments.count()

    def get_user_has_liked(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            return obj.likes.filter(user=request.user).exists()
        return False


class LikeSerializer(serializers.ModelSerializer):
    """
    Serializer for likes
    """
    class Meta:
        model = Like
        fields = ('id', 'post', 'user', 'created_at')
        read_only_fields = ('id', 'user', 'created_at')
