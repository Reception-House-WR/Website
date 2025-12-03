export interface WebPage<TSections = any[]>{
    title: string;
    identifier: string;
    sections: TSections
}