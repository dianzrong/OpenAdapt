"""
Script for creating use case recordings.

Specifically, this file uses recordSDK and NiceGUI to
allow users to easily create and share use cases in OpenAdapt.

"""
# import fire
import tracemalloc
from nicegui import ui
from nicegui.element import Element
from loom import Loom


tracemalloc.start()


async def start():
    recorder = Loom()
    ui.run_javascript('await recorder.start_recording()')  # probs change
    ui.notify('The recording has started')


async def get_date():
    time = await ui.run_javascript('Date()')
    ui.notify(f'Browser time: {time}')


ui.button('start recording', on_click=start)
ui.button('receive result', on_click=get_date)

ui.run(port=8000)

# if __name__ == "__main__":
#     fire.Fire(create_use_case)
