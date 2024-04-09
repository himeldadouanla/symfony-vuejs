import axios from "axios";

export default {
    create(publication_date) {
        return axios.article("/api/articles", {
            publication_date: publication_date
        });
    },
    create(title) {
        return axios.article("/api/articles", {
            title: title
        });
    },
    create(description) {
        return axios.article("/api/articles", {
            description: description
        });
    },
    findAll() {
        return axios.get("/api/articles");
    }
};