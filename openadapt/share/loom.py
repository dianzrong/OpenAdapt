from typing import Callable, Optional

from nicegui import ui
from nicegui.dependencies import register_component
from nicegui.element import Element


class Loom(Element):
    """
    The application where loom is used to record videos.
    """

    def __init__(self) -> None:  # add more attributes !?
        register_component('loom', __file__, 'updated_loom.js')
        super().__init__('loom')

    async def start_recording(self) -> None:
        """
        When the button is clicked, start the recording.
        """
        await self.run_method('initialize_loom')
