from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PostViewSet, CommentCreateView, CommentListView, LikeToggleView

router = DefaultRouter()
router.register(r'posts', PostViewSet, basename='post')

urlpatterns = [
    path('', include(router.urls)),
    path('posts/<int:post_id>/like/', LikeToggleView.as_view(), name='post-like'),
    path('posts/<int:post_id>/comments/', CommentListView.as_view(), name='post-comments'),
    path('comments/', CommentCreateView.as_view(), name='comment-create'),
]
