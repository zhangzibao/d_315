import axios from "axios";
import {User, Record} from '@/model';

const instance = axios.create({
    baseURL: "http://zhangzibao.xyz:8080/315",
    timeout: 2000,
    headers: {
        "Content-Type": "application/json",
        "Authorization": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo2LCJ1c2VybmFtZSI6InBpZyIsImV4cCI6MTU0MDI1NzMzNywiZW1haWwiOm51bGx9.SxS9MLy9D9nUpi5qIGsAKly4t5IkIEx9vw13LoXJi_A"
    },
    validateStatus(status) {
        return status >= 200 || status < 500; // default
    }
});

export default {
    getUser(id: any = 0): any {
        if (id === 0) {
            return instance.get('/User').then((res: any) => res.data);
        }
        return instance.get('/User/' + id).then((res: any) => res.data);
    },
    getRecord(id: any = 0): any {
        if (id === 0) {
            return instance.get('/Record').then((res: any) => res.data);
        }
        return instance.get('/Record/' + id).then((res: any) => res.data);
    },
    addRecord(record: Record): any {
        return instance.post('/Record', record).then((res: any) => res.data);

    },
    addUser(user: User): any {
        return instance.post('/User', user).then((res: any) => res.data);
    },
    login(user: any): any {
        return instance.post('/Login', user).then((res: any) => res.data);
    }
};
