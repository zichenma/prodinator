export interface Project {
    id?: string;
    name: string;
    desc?: string;
    coverImg: string;
    taskLists?: string[]; // list Id goes here
    members?: string[]; // members Id
}