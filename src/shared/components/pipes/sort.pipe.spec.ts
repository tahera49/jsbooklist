import {SortPipe} from './sort.pipe';

describe('Pipe: SortPipe', () => {
	let pipe: SortPipe;

	beforeEach(() => {
		pipe = new SortPipe();
	});

	describe('Unit Tests', () => {
		it('returns the sorted one', () => {
			var obj=[];
			obj.push({
				"producerProfile":{
					"name":"util"
				}
			});
			obj.push({
				"producerProfile":{
					"name":"member"
				}
			});
			
			expect(pipe.transform(obj, '')).toEqual(obj);
		});

		it('returns lower value', () => {
			var obj=[];
			obj.push({
				"producerProfile":{
					"name":"member"
				}
			});
			obj.push({
				"producerProfile":{
					"name":"util"
				}
			});
			
			expect(pipe.transform(obj, 'name')).toEqual(obj);
		});

		it('returns equal value', () => {
			var obj=[];
			obj.push({
				"producerProfile":{
					"name":"member"
				}
			});
			obj.push({
				"producerProfile":{
					"name":"member"
				}
			});
				
			expect(pipe.transform(obj, '')).toEqual(obj);
		});
	}); 
});