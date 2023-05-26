import axios from "axios";
import { OPENAI_API_KEY } from "../config/secret";

export const callGPT = (baseText: string, userContent: string) => {
    return new Promise((resolve, reject) => {
      axios.post(
        `https://api.openai.com/v1/chat/completions`,
        {
            "model": "gpt-3.5-turbo",
            "messages": [
                {"role": "system", "content": baseText },
                {"role": "user", "content": userContent },
            ]
        },
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${OPENAI_API_KEY}`
            }
        }
    ).then(res => {
        if(res) {
            const response = res.data.choices[0].message.content;
            resolve(response)
        }
    })
    .catch(err => reject(err));
    });
}