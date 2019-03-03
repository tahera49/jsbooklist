import { Pipe } from "@angular/core";

@Pipe({
	name: "sort"
})
export class SortPipe {
	transform(array: Array<string>, args: string): Array<string> {
		array.sort((a: any, b: any) =>{
			if(a.title.name.toLowerCase() < b.title.name.toLowerCase()) {
				return -1;
			}
			else if(a.title.name.toLowerCase() > b.title.name.toLowerCase()) {
				return 1;
			}
			else {
				return 0;
			}
		});
		return array;
	}
}/* istanbul ignore next */