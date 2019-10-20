import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiURL: string = 'https://api.genesysappliedresearch.com/v2/knowledge';
  organizationId: string = '07a6f922-c3b5-4022-a3d3-c109903357ba';
  secretKey: string = 'c02cd8a2-f24f-4406-82a0-692ca2dfaf75';

  constructor(protected httpClient: HttpClient) { }

  public async getKnowledgeBases(token: string){
  	var result = await this.httpClient.get(`${this.apiURL}/knowledgebases`, {
      headers: new HttpHeaders({
        "organizationId": `${this.organizationId}`,
        "token": `${token}`
      })
    }).toPromise();
    return result;
  }

  public async getKnowledgeBaseById(id: string, token: string){
  	var result = await this.httpClient.get(`${this.apiURL}/knowledgebases/${id}`, {
      headers: new HttpHeaders({
        "organizationId": `${this.organizationId}`,
        "token": `${token}`
      })
    }).toPromise();
    return result;
  }

  public async createKnowledgeBase(token: string){
  	var result = await this.httpClient.post(`${this.apiURL}/knowledgebases`, {
	  "name" : "Knowledge Base for Dude",
	  "description" : "Dude's Knowledge base",
	  "coreLanguage" : "en-US"
  	},
  	{
      headers: new HttpHeaders({
        "organizationId": `${this.organizationId}`,
        "token": `${token}`
      })
    }).toPromise();
    return result;
  }

  public async updateKnowledgeBase(id: string, token: string){
  	var result = await this.httpClient.put(`${this.apiURL}/knowledgebases/${id}`, {
	  "name" : "Knowledge Base for HomeLander",
	  "description" : "HomeLander Knowledge base",
	  "coreLanguage" : "en-US"
  	},
  	{
      headers: new HttpHeaders({
        "organizationId": `${this.organizationId}`,
        "token": `${token}`
      })
    }).toPromise();
    return result;
  }

  public async deleteKnowledgeBase(id: string, token: string){
  	var result = await this.httpClient.delete(`${this.apiURL}/knowledgebases/${id}`,
  	{
      headers: new HttpHeaders({
        "organizationId": `${this.organizationId}`,
        "token": `${token}`
      })
    }).toPromise();
    return result;
  }



  public async getToken(){
  	 var result = await this.httpClient.post(`${this.apiURL}/generatetoken`, null, {
      headers: new HttpHeaders({
        "organizationid": `${this.organizationId}`,
        "secretkey": `${this.secretKey}`
      })
    }).toPromise();
    return result;
  }
}
