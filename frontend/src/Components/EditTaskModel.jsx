import { useEffect, useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { PencilSquareIcon } from '@heroicons/react/24/outline'
import axios from 'axios'

export default function EditTaskModal({ isOpen, onClose, task }) {
  const [title, setTitle] = useState(task?.title || '')
  const [detail, setDetail] = useState(task?.detail || '')

  useEffect(() => {
    console.log('frontend task>>>>>>', task)
  }, [task])

  const handleSubmit = (event) => {
    event.preventDefault()
    const taskId = task._id
    if (!title || !detail) {
      console.error('Title or detail is missing')
      return
    }

    axios
      .put(
        `/api/v4/user/update-task/${task.user}`, // Adjust the API route if necessary
        { taskId, title, detail },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        },
      )
      .then(() => {
        console.log('Updated task successfully 👍👍')
        onClose()
        window.location.reload()
      })
      .catch((error) => {
        console.error('Error updating task:', error)
      })
  }

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <form onSubmit={handleSubmit}>
              <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                    <PencilSquareIcon aria-hidden="true" className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <DialogTitle as="h3" className="text-base font-semibold text-gray-900">
                      Edit Task
                    </DialogTitle>
                    <div className="mt-2">
                      <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Task Title"
                        className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <textarea
                        value={detail}
                        onChange={(e) => setDetail(e.target.value)}
                        placeholder="Task Description"
                        className="w-full px-3 py-2 mt-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows="4"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="submit"
                  className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                >
                  Cancel
                </button>
              </div>
            </form>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}
