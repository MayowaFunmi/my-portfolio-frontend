class Config{
    static registerUrl = 'http://127.0.0.1:8000/portfolio/signup/';
    static refreshApiUrl = "http://127.0.0.1:8000/api/token/refresh/";
    static loginUrl='http://127.0.0.1:8000/api/token/';
    static logoutPageUrl = "/logout";
    static logoutUrl = "http://127.0.0.1:8000/portfolio/logout/"
    static listAllUsersUrl = 'http://127.0.0.1:8000/portfolio/list_users/';
    static ContactsUrl = 'http://127.0.0.1:8000/portfolio/list_contacts/';
    static blogPostUrl = 'http://127.0.0.1:8000/blog/posts/';
    static commentUrl = 'http://127.0.0.1:8000/blog/comments/';
    static blogCategoryUrl = 'http://127.0.0.1:8000/blog/categories/';
}

export default Config