import { Response } from "@angular/http";
import { Observable } from "rxjs";



const extractError = (error: Response | any): string => {
    let errorMsg: string;
    if(error instanceof Response) {
        const body = error.json() || '';
        const err = body.error || JSON.stringify(body);
        errorMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    }else{
        errorMsg = error.message ? error.message : error.toString();
    }
    console.log(errorMsg);
    return errorMsg;
}

export abstract class BaseService {
    protected handlePromiseError(error: Response | any): Promise<any> {
        return Promise.reject(extractError(error));
    }
    
    protected handleObservableError(error: Response | any): Observable<any> {
        return Observable.throw(extractError(error));
    }
}