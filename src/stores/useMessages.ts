import { defineStore } from "pinia";
import { ref } from "vue";
import { GroupMessage } from "../types/GroupMessage.type";

let count: number = 15;

const coinFlip: ()=> boolean = ()=> !!Math.round(Math.random());

const getRandomMessage = (): GroupMessage => ({
    id: ++count + '',
    content: `the content of id: ${count}`,
    attachment: coinFlip() ? 'https://picsum.photos/350/165?random' : null
})

export const useMessages = defineStore('useMessage',()=>{
    const messages = ref<GroupMessage[]>([
        {
            id: 0 + '',
            content: `the content of id: ${0}`,
            attachment: coinFlip() ? 'https://picsum.photos/350/165?random' : null
        },
        {
            id: 1 + '',
            content: `the content of id: ${1}`,
            attachment: coinFlip() ? 'https://picsum.photos/350/165?random' : null
        },
        {
            id: 2 + '',
            content: `the content of id: ${2}`,
            attachment: coinFlip() ? 'https://picsum.photos/350/165?random' : null
        },
        {
            id: 3 + '',
            content: `the content of id: ${3}`,
            attachment: coinFlip() ? 'https://picsum.photos/350/165?random' : null
        },
        {
            id: 4 + '',
            content: `the content of id: ${4}`,
            attachment: coinFlip() ? 'https://picsum.photos/350/165?random' : null
        },
        {
            id: 5 + '',
            content: `the content of id: ${5}`,
            attachment: coinFlip() ? 'https://picsum.photos/350/165?random' : null
        },
        {
            id: 6 + '',
            content: `the content of id: ${6}`,
            attachment: coinFlip() ? 'https://picsum.photos/350/165?random' : null
        },
        {
            id: 7 + '',
            content: `the content of id: ${7}`,
            attachment: coinFlip() ? 'https://picsum.photos/350/165?random' : null
        },
        {
            id: 8 + '',
            content: `the content of id: ${8}`,
            attachment: coinFlip() ? 'https://picsum.photos/350/165?random' : null
        },
        {
            id: 9 + '',
            content: `the content of id: ${9}`,
            attachment: coinFlip() ? 'https://picsum.photos/350/165?random' : null
        },
        {
            id: 10 + '',
            content: `the content of id: ${10}`,
            attachment: coinFlip() ? 'https://picsum.photos/350/165?random' : null
        },
        {
            id: 11 + '',
            content: `the content of id: ${11}`,
            attachment: coinFlip() ? 'https://picsum.photos/350/165?random' : null
        },
        {
            id: 12 + '',
            content: `the content of id: ${12}`,
            attachment: coinFlip() ? 'https://picsum.photos/350/165?random' : null
        },
        {
            id: 13 + '',
            content: `the content of id: ${13}`,
            attachment: coinFlip() ? 'https://picsum.photos/350/165?random' : null
        },
        {
            id: 14 + '',
            content: `the content of id: ${14}`,
            attachment: coinFlip() ? 'https://picsum.photos/350/165?random' : null
        },
    ]);
    const addMessage = ()=> messages.value.push(getRandomMessage());

    return {
        messages,
        addMessage
    }
})