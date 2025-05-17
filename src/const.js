const Status = {
    WATCHED: true,
	UNWATCHED: false,
};

const StatusLabel = {
    [Status.UNWATCHED]: "Непросмотрен",
    [Status.WATCHED]: "Просмотрен",
};

export {Status, StatusLabel};