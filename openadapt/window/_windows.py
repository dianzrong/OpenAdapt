from loguru import logger
import pygetwindow as pgw


def get_active_window_state():
    meta = get_active_window_meta()
    title = meta.title
    geometry = meta.box
    left, top, width, height = geometry
    state = {
        "title": title,
        "left": left,
        "top": top,
        "width": width,
        "height": height,
        # TODO: get window state; see:
        # https://github.com/MLDSAI/OpenAdapt/issues/75#issuecomment-1536762953
        "meta": None,
        "data": None,
        "window_id": None,
    }
    return state

def get_active_window_meta() :
    window = pgw.getActiveWindow()
    if not window:
        logger.warning(f"{window=}")
        return None
    return window

def get_element_at_position(x, y):
    # TODO
    return None
