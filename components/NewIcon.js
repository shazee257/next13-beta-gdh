import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';

const CreateNewIcon = ({ text }) => {
    return (
        <div className='p-2 text-[#2e8cca] border-blue-200 rounded-md justify-center items-center space-x-1 cursor-pointer hover:bg-[#2e8cca] hover:text-white'>
            <AddCircleOutlineOutlinedIcon fontSize='large'
            // className='h-12 w-12'
            />
            <span className="text-lg font-bold">{text}</span>
        </div>
    )
}

export default CreateNewIcon