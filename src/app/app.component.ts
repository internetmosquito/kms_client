import { Component } from '@angular/core';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'client';
  kbs: any[] = [];
  token: string = '';

  constructor(protected apiService: ApiService){
  }

  ngOnInit() {
    //Let's get a token
    this.apiService.getToken().then(
      (data) => { 
        this.token = data['token'];
        console.log(this.token);
        if (this.token.length > 0){
        	this.apiService.getKnowledgeBases(`${this.token}`).then(
        		(data) => { 
        		  this.kbs = data['entities'];
        		  console.log('List of existing Knowledge Bases');
        		  console.log(this.kbs);
        		  var kbId = this.kbs[0].id;
        		  this.apiService.getKnowledgeBaseById(`${kbId}`, `${this.token}`).then(
	        		(data) => {
	        		  console.log('Knowledge Base ' + `${kbId}` + ' contents'); 
	        		  console.log(data);
	        		  //Update the KB firsst
	        		  this.apiService.updateKnowledgeBase(`${kbId}`, `${this.token}`).then(
			        	(data) => { 
			        	  console.log('Updated Knowledge Base!');
			        	  console.log(data);
			        	  // Let's delete some kb if there are too many
			        	  if (this.kbs.length > 3){
			        	    this.apiService.deleteKnowledgeBase(`${kbId}`, `${this.token}`).then(
			        		  (data) => { 
			        		    console.log('Deleted Knowledge Base!');		
			      			  }).catch((error)=>{
			      			    console.log(error);
			      		      });
			        	  }
			        	  else{
			        	  	// Let's make a Knowledge Base
			        	  	this.apiService.createKnowledgeBase(`${this.token}`).then(
			        		  (data) => { 
			        		    console.log('Created Knowledge Base!');
			        		    console.log(data);
			      			  }).catch((error)=>{
			      				console.log(error);
			      			  });
			        	  }
					      
			      	    }).catch((error)=>{
			      		  console.log(error);
			            });	        		  
	      			}).catch((error)=>{
	      				console.log(error);
	      			});
      			}).catch((error)=>{
      				console.log(error);
      			});
        }
      }).catch((error)=>{
      	console.log(error);
      });
  }
}
