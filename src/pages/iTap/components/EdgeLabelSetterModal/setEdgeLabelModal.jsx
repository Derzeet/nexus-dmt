
import './setEdgeLabelModal.scss'

function SetEdgeLabelModal({onSubmit, onClose}) {
    return (
        <div className="edge-label-set-modal">
            <div className="modal-header">
                <h1>asdasd</h1>
            </div>
            <div className="modal-body">
                <div className='label'>
                    <input type="text" name="" id="" />
                    <label htmlFor="">Введите текст</label>
                </div>
                <div className='label'>
                    <input type="color" name="" id="" />
                    <label htmlFor="">Выберите цвет</label>
                </div>
            </div>
            <div className="modal-footer">
                
            </div>
        </div>
    )
}

export default SetEdgeLabelModal