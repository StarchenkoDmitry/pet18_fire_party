/*
object:
    -task()

    -isDone(): boolean
    -isDoing(): boolean
    -isWaitng(): boolean
    -isCancel(): boolean

    -cancel(): boolean
    -tryCancel(): Promise
*/

export function CreateTask(func: (...funcArgs:any)=>void){
    let _doing = false
    let _done = false
    let _cancel = false
    const awaiters = []
    return {
        task(...args:any){
            _doing = true
            try {
                if(!_cancel){
                    func(...args);
                }
            } catch (error) {

            }
            finally{
                _doing = false
                _done = true
            }
        },
        cancel(){ _cancel = true },
        isCancel(){return _cancel}
    }
}