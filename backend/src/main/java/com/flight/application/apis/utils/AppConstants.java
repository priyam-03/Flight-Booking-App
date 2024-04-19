package com.blog.application.apis.utils;

public class AppConstants {
    private AppConstants() {
    }

    public static final String PASSWORD_PATTERN = "^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\\-=\\[\\]{};':\"<>,.?\\\\|]).{8,}$";
    public static final String CATEGORY_BASE_URL = "/api/v1/categories";
    public static final String CATEGORY_ID = "/{id}";
    public static final String POST_BASE_URL = "/api/v1/posts";
    public static final String POST_CREATE_URL = "/users/{userId}";
    public static final String POST_ID = "/{postId}";
    public static final String POST_CATEGORY_ID = "/categories/{categoryId}";
    public static final String POST_USER_ID = "/users/{userId}";
    public static final String POST_SEARCH = "/search";
    public static final String USER_BASE_URL = "/api/v1/users";
    public static final String USER_ID = "/{id}";
    public static final String CATEGORY_TITLE_REQUIRED = "Title is required";
    public static final String CATEGORY_TITLE_SIZE = "Title must be between 1 and 50 characters";
    public static final String CATEGORY_TITLE_DESCRIPTION = "Description should not exceed 255 characters";
    public static final String POST_TITLE_REQUIRED = "Title is required";
    public static final String POST_TITLE_SIZE = "Title must be between 1 and 100 characters";
    public static final String POST_CONTENT_REQUIRED = "Content is required";
    public static final String POST_IMAGE_DEFAULT = "default.png";
    public static final String USER_NAME_REQUIRED = "Name is required";
    public static final String USER_EMAIL_INVALID = "Invalid email format";
    public static final String PASSWORD_VALIDATION = "Password must be at least 8 characters";
    public static final String ABOUT_MESSAGE = "About field should not exceed 255 characters";
    public static final String CATEGORY_TITLE = "title";
    public static final String CATEGORY_DESCRIPTION = "description";
    public static final String CATEGORY = "category";
    public static final String POST_TITLE = "post_title";
    public static final String CATEGORY_TABLE_ID = "category_id";
    public static final String USER_NAME = "user_name";
    public static final String USER = "user";
    public static final long JWT_TOKEN_VALIDITY = 5 * 60 * 60;
    public static final String LOGGED_IN_SUCCESSFULLY = "Logged in successfully !";
    public static final String BASE_AUTH_URL = "/auth";
    public static final String LOGIN = "/login";
    public static final String REGISTER = "/register";
    public static final String COMMENTS_BASE_URL = "/api/v1/comments";
    public static final String COMMENTS_POST_URL = "/users/{userId}/posts/{postId}";
    public static final String COMMENTS_GET_URL = "/posts/{postId}";
    public static final String COMMENTS_DELETE_URL = "/{commentId}";
    public static final String POST_UPLOAD_IMAGE_URL = "/{postId}/upload/image";
    public static final String POST_DOWNLOAD_IMAGE = "/post/image/{imageName}";
    public static final String LIKE_TABLE = "booking";
    public static final String AUTHORIZATION_HEADER = "Authorization";
    public static final String[] PUBLIC_URLS = {
            "/auth/**",
    };
}
