try {
	var fly = new ActiveXObject("InternetExplorer.Application");
	with (fly) {
		Navigate("about:blank");
		// while (Busy) WSH.Sleep(10); // Необязательно, так  как проверки показали, что к моменту выполнения следующей строчки about:blank уже открывается.
		W = Document.parentWindow.screen.availWidth;
		H = Document.parentWindow.screen.availHeight;
		//Navigate("http://www.google.ru"); // Открывает гугл (sic!). Не стал открывать сразу, что бы не ждать пока подгрузится страница, а сразу выполнить предыдущие 2 строчки.
		Height = 250; // Устанавливает ширину окна. Можем ставить какую угодно.
		Width = 250;
		//Resizable = false; // Если убрать комментарий станет запрещено изменять размеры окна мышкой, добавил, но думаю что оставлять не целесообразно.
		Silent = true;
		FullScreen = false; // Убираем панели.
		MenuBar = false;
		StatusBar = false;
		AddressBar = false;
		ToolBar = false;
		top = 1; // Можно указать любой или не указывать вообще.
		left = 1;
		Visible = true;
	}
	ms = 1; // Модуль скорости. Может быть только положительным.
	st = (1)*ms; // Скорость движения окна по вертикали. Установить можем любую, однако в любом случаи в процессе выполнения она станет по модулю равной модулю скорости.
	sl = (1)*ms; // Скорость движения окна по горизонтали. Аналогично. Выписано задание отдельно для того, что бы можно было задать направление движения со старта.
	while (true) {
		if (fly.top < 0) st = ms; // Проверка на нахождение окна в вертикали экрана.
		else 
			if (fly.top+fly.Height > H) st = -1*ms;
		if ((fly.top+fly.Height <= H-5) || (fly.top >= 5)) // Проверка на "гипертрофированность" высоты окна.
			fly.top += st; // Движение окна по вертикали..			
		if (fly.left < 0) sl = ms; // Проверка на нахождение окна в горизонтали экрана.
		else
			if (fly.left+fly.Width > W) sl = -1*ms;
		if ((fly.left+fly.Width <= W-5) || (fly.left >= 5)) // Проверка на "гипертрофированность" ширины окна.
			fly.left += sl; // Движение окна по горизонтали.
		WSH.Sleep(15);
	}
}
catch(err) {}